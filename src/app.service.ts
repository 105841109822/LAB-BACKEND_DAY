import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { hashSync, compareSync } from 'bcrypt';
import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { extname, join } from 'path';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { PrismaService } from './prisma';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService, 
    private readonly prisma: PrismaService
  ) {}

  async uploadMahasiswaFoto(file: Express.Multer.File, nim: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({ where: { nim } });
    if (!mahasiswa) throw new NotFoundException('Mahasiswa Tidak Ditemukan');

    if (mahasiswa.foto_profile) {
      const filePath = join(__dirname,`../uploads/${mahasiswa.foto_profile}`);
      if (existsSync(filePath)) {
        rmSync(filePath);
      }
    }

    const uploadPath = join(__dirname, `../uploads/`);
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }

    const fileExt = extname(file.originalname);
    const baseFilename = mahasiswa.nim;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${baseFilename}-${uniqueSuffix}${fileExt}`;
    const filePath = `${uploadPath}${filename}`;

    writeFileSync(filePath, file.buffer);
    await this.prisma.mahasiswa.update({
      where: { nim },
      data: { foto_profile: filename },
    });

    return filename;
  }

  async getMahasiwaFoto(nim: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({ where: { nim } });
    if (!mahasiswa) throw new NotFoundException('Mahasiswa Tidak Ditemukan');
    return mahasiswa.foto_profile;
  }

  async register(data: RegisterUserDTO) {
    try {
      const user = await this.prisma.user.findFirst({ 
        where: { username: data.username }
      });
      if (user) throw new BadRequestException("User ini Sudah Digunakan");

      const hash = hashSync(data.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          username: data.username,
          password: hash,
        },
      });
      return newUser;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit");
    }
  }

  async auth(user_id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: user_id }
      });
      if (!user) throw new NotFoundException("User Tidak Ditemukan");
      return user;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit");
    }
  }

  async login(data: LoginDTO) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { username: data.username }
      });

      if (!user) throw new NotFoundException('User tidak ditemukan');
      if (!compareSync(data.password, user.password)) throw new BadRequestException('Password Salah');

      const payload = { id: user.id, username: user.username, role: user.role };
      const token = await this.jwtService.signAsync(payload);

      return { token, user };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException('Terdapat masalah dari server, harap coba lagi dalam beberapa menit.');
    }
  }

  getHello(): string {
    return 'Hello World!';
  }

  getMahasiswa() {
    return this.prisma.mahasiswa.findMany();
  }
  async addMahasiswa(data: CreateMahasiswaDTO) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: { nim: data.nim }
    });

    if (mahasiswa) throw new BadRequestException("Mahasiswa dengan nim ini sudah ada");

    await this.prisma.mahasiswa.create({ data });
    return this.prisma.mahasiswa.findMany();
  }

  async getMahasiswByNim(nim: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: { nim }
    });

    if (!mahasiswa) throw new NotFoundException("Tidak Menemukan NIM");
    return mahasiswa;
  }

  async menghapusMahasiswa(nim: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: { nim }
    });

    if (!mahasiswa) throw new NotFoundException("Tidak Menemukan NIM");
    await this.prisma.mahasiswa.delete({ where: { nim } });
    
    return this.prisma.mahasiswa.findMany();
  }

  async updateMahasiswa(nim: string, data: CreateMahasiswaDTO) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: { nim }
    });

    if (!mahasiswa) throw new NotFoundException("Tidak Menemukan NIM");
    await this.prisma.mahasiswa.update({
      where: { nim },
      data
    });

    return this.prisma.mahasiswa.findMany();
  }
}