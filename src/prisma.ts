import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

export default class PrimaService extends 
PrismaClient 
implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}