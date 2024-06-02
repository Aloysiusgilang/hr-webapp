<script setup lang="ts">
import { defineProps } from "vue";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Attendance } from "@/api/types/attendance";

import dayjs from "dayjs";
import { useAuthStore } from "@/stores/authStore";

const { user } = useAuthStore();

const props = defineProps<{
  attendances: Attendance[];
}>();
</script>

<template>
  <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="hidden w-[100px] sm:table-cell">
              <span class="sr-only">img</span>
            </TableHead>
            <TableHead class="hidden md:table-cell"> Timestamp </TableHead>
            <TableHead>Status</TableHead>
            <TableHead
              v-if="user!.role === 'admin'"
              class="hidden md:table-cell"
            >
              Employee
            </TableHead>
            <TableHead
              v-if="user!.role === 'admin'"
              class="hidden md:table-cell"
            >
              Position
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="attendance in props.attendances">
            <TableCell class="hidden sm:table-cell">
              <img
                alt="Product image"
                class="aspect-square rounded-md object-cover"
                height="64"
                :src="attendance.photo_url"
                width="64"
              />
            </TableCell>
            <TableCell class="font-medium">
              {{ dayjs(attendance.date).format("YYYY-MM-DD HH:mm:ss") }}
            </TableCell>
            <TableCell>
              <Badge variant="outline"> ontime </Badge>
            </TableCell>
            <TableCell
              v-if="user!.role === 'admin'"
              class="hidden md:table-cell"
              >{{ attendance.employee?.full_name }}</TableCell
            >
            <TableCell
              v-if="user!.role === 'admin'"
              class="hidden md:table-cell"
              >{{ attendance.employee?.position }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  </main>
</template>
