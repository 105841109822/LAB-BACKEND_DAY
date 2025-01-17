import { ApiProperty } from "@nestjs/swagger";
import { jenis_kelamin as Jenis_Kelamin } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateMahasiswaDTO {

    @ApiProperty({ description : "NIM", type : String, example : "105841109822" })
    @IsString({message : "NIM Harus Bertipe String"})
    @IsNotEmpty({message : "Tidak Boleh Kosong"})
    @Length(1, 12, {message : "Hanya bisa sampai 12 karakter"})
    nim : string;

    @ApiProperty({description :"Nama", type : String, example : "Dayang Aisyah"})
    @IsString({message : "Nama Harus Bertipe String"})
    @IsNotEmpty({message : "Tidak Boleh Kosong"})
    @Length(1, 50, {message : "Hanya bisa sampai 12 karakter"})
    nama : string;

    @ApiProperty({description :"Kelas", type : String, example : "5C"})
    @IsString({message : "Kelas Harus Bertipe String"})
    @IsNotEmpty({message : "Tidak Boleh Kosong"})
    @Length(1, 2, {message : "Hanya bisa sampai 2 karakter"})
    kelas : string;

    @ApiProperty({description :"Jurusan", type : String, example : "Informatika"})
    @IsString({message : "Jurusan Harus Bertipe String"})
    @IsNotEmpty({message : "Tidak Boleh Kosong"})
    @Length(1, 20, {message : "Hanya bisa sampai 20 karakter"})
    jurusan : string;

    jenis : Jenis_Kelamin;

    @ApiProperty ({
        enum : Jenis_Kelamin,
        description : "Jenis Kelamin",
        example : "P"
    })
    @IsEnum(Jenis_Kelamin, {
        message : 
        "Jenis Kelamin Hanya bernilai L dan P"
    })
    jenis_kelamin : Jenis_Kelamin;
}