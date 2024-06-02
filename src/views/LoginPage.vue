<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const { login } = useAuthStore();
const router = useRouter();

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string(),
    password: zod.string(),
  })
);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

const onSubmit = handleSubmit(async () => {
  const formData = {
    email: email.value,
    password: password.value,
  };

  const res = await login(formData);
  if (res.user) {
    router.push("/");
  } else {
    alert("Invalid credentials");
  }
});
</script>

<template>
  <div class="flex h-full justify-center items-center">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
          <p>Use default account</p>
          <p>Email: user7@gmail.com</p>
          <p>Password: user8</p>
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            v-model="email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input v-model="password" id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter class="flex flex-col">
        <p v-if="isSubmitting" class="text-sm text-center">Logging in...</p>
        <Button
          @click.prevent="onSubmit()"
          class="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
