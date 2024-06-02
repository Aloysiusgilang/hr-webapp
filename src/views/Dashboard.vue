<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CircleUser, Home, Menu, Package2 } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import AttendanceTable from "@/components/AttendanceTable.vue";

import useAttendance from "@/composables/useAttendance";

import { Employee } from "@/api/types/employee";
import { Attendance } from "@/api/types/attendance";

import { useAuthStore } from "@/stores/authStore";
import dayjs from "dayjs";

const { getProfile, logout } = useAuthStore();
const { getAllAttendances } = useAttendance();

const employee = ref<Employee>();
const loading = ref(false);

const currentDate = ref(dayjs().format("YYYY-MM-DDTHH:mm:ssZ"));
const attendances = ref<Attendance[]>([]);

// file upload validation

onMounted(async () => {
  loading.value = true;
  const res = await getProfile();
  employee.value = res;

  if (employee.value) {
    const attendanceRes = await getAllAttendances();
    attendances.value = attendanceRes;
  }

  loading.value = false;
});
</script>

<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <div
              :class="{
                'animate-pulse': loading,
              }"
            >
              Admin Dashboard
            </div>
          </a>
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <a
              href="/"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home class="h-4 w-4" />
              Attendance
            </a>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <header
        class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
      >
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
              <Menu class="h-5 w-5" />
              <span>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="flex flex-col">
            <nav class="grid gap-2 text-lg font-medium">
              <a href="#" class="flex items-center gap-2 text-lg font-semibold">
                <Package2 class="h-6 w-6" />
                <span class="sr-only">Acme Inc</span>
              </a>
              <a
                href="#"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Home class="h-5 w-5" />
                Attendance
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <div class="w-full flex-1">
          <p class="font-bold text-lg">Amin Name: {{ employee?.full_name }}</p>
          <LoadingSpinner :loading="loading" />
        </div>
        <Button @click="logout" variant="secondary" class="rounded-full">
          Logout
        </Button>
        <Button variant="secondary" size="icon" class="rounded-full">
          <CircleUser class="h-5 w-5" />
          <span class="sr-only">Toggle user menu</span>
        </Button>
      </header>
      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-semibold md:text-2xl">Attendance</h1>
          <p class="text-sm text-muted-foreground">
            {{ dayjs(currentDate).format("YYYY-MM-DD HH:mm:ss") }}
          </p>
        </div>
        <div class="flex flex-col">
          <h2 class="text-xl font-semibold">All Attendance Records</h2>
          <LoadingSpinner :loading="loading" />

          <AttendanceTable :attendances="attendances" />
        </div>
      </main>
    </div>
  </div>
</template>
