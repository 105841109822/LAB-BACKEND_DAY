<<<<<<< HEAD
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
>>>>>>> origin/main

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 🚀 Lab Backend API

Lab Backend adalah proyek backend berbasis Node.js dan NestJS yang menyediakan API untuk memproses data, mengelola user, serta mendukung komunikasi real-time dengan WebSocket.

## ✨ Fitur Utama
- CRUD Data User
- Autentikasi dan Otorisasi JWT
- Dokumentasi API menggunakan Swagger
- Komunikasi real-time menggunakan WebSocket
- Manajemen database dengan PostgreSQL

## 💻 Tech Stack

*Client:* [Swagger](https://swagger.io/), [Socket.io](https://socket.io/)
- Swagger: Swagger pada sisi client digunakan untuk menguji dan mendokumentasikan API yang disediakan oleh server. Ini memungkinkan pengguna berinteraksi dengan endpoint server langsung dari antarmuka web.
- Socket.io (Client Side): Socket.io juga berjalan di sisi client sebagai library JavaScript yang membuka koneksi WebSocket ke server.

*Server:* [Node.js](https://nodejs.org/), [NestJS](https://nestjs.com/), [PostgreSQL](https://www.postgresql.org/), [Socket.io](https://socket.io/)
- Node.js: Node.js adalah lingkungan eksekusi JavaScript di server yang menjalankan aplikasi backend, termasuk API RESTful dan WebSocket.
- NestJS: NestJS adalah framework yang berjalan di atas Node.js untuk mengembangkan backend aplikasi dengan arsitektur modular dan dukungan lengkap terhadap API REST serta WebSocket.
- PostgreSQL: PostgreSQL adalah database server yang menyimpan data aplikasi, yang diakses oleh Node.js atau NestJS melalui query SQL.
- Socket.io (Server Side): Digunakan di sisi server untuk berkomunikasi dengan klien secara real-time menggunakan koneksi WebSocket.

## 🛠️ Instalasi Proyek

### Prasyarat  
Pastikan Anda telah menginstal:  
- [Node.js](https://nodejs.org/): Platform runtime JavaScript yang digunakan untuk menjalankan aplikasi backend.
- [PostgreSQL](https://www.postgresql.org/): Database relasional yang digunakan untuk menyimpan data aplikasi.   

### Langkah-langkah Instalasi  
1. Clone repository:  
   bash
   git clone https://github.com/username/repo-name.git
2. Pindah ke direktori proyek:
   bash
   cd Lab-Backend
3. Install semua dependency:
   bash
   npm install
4. Salin file konfigurasi environment:
   bash
   cp .env.example .env
File konfigurasi .env berisi variabel seperti URL database dan secret token:
- DATABASE_URL=postgres://user:password@localhost:5432/db_name JWT_SECRET=your_jwt_secret PORT=3000
5. Jalankan server:
   bash
   npm run start 
6. Buka aplikasi di (http://localhost:3000)

---

## 📦 Instalasi Library Tambahan  

- **NestJS WebSocket dan Socket.io:** 
    Untuk komunikasi real-time antar client-server.
   bash
   npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
- *Autentikasi JWT:* 
    Untuk keamanan dan autentikasi berbasis token JSON Web Tokens.
   bash
   npm install @nestjs/jwt passport-jwt
- **PostgreSQL:**
    Integrasi TypeORM dengan PostgreSQL untuk pengelolaan database relasional.
   bash
   npm install @nestjs/typeorm pg typeorm   
- *Swagger Dokumentasi API:* 
    Untuk membuat dokumentasi interaktif API secara otomatis.
   bash
   npm install @nestjs/swagger swagger-ui-express

---

## 📖 Dokumentasi API 
Swagger adalah alat dokumentasi API yang membantu developer memahami dan menguji API yang tersedia di aplikasi.
- **Akses:** Buka browser dan akses Swagger pada
bash
http://localhost:3000/api-docs

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
=======

