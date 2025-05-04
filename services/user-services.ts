// services/user-service.ts
import prisma from "@/lib/prisma"
import type { User } from "@prisma/client"
import { hash, compare } from "bcrypt"
import { sign } from "jsonwebtoken"

// Fungsi-fungsi yang sudah ada

// Tambahkan fungsi yang diminta
export async function getUsersByRoles(roles: string[]): Promise<User[]> {
  return prisma.user.findMany({
    where: {
      role: {
        in: roles,
      },
    },
    orderBy: {
      name: "asc",
    },
  })
}