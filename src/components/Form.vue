<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { firestore } from "@/lib/firebase-config";
import { Db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const isSubmitting = ref(false);

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    surname: z.string().min(2).max(50),
    email: z.string().email(),
    playtomic_url: z.string().url(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    const db = new Db(firestore);
    const emailExist = await db.get(values.email);
    if (emailExist || localStorage.getItem("email") === values.email) {
      alert("Email already exists");
      return;
    }
    await db.set(values);
    localStorage.setItem("email", values.email);
  } catch (e) {
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>Create Account</CardTitle>
      <CardDescription
        >Fill in your details to create a new account.</CardDescription
      >
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit" class="space-y-7">
        <FormField v-slot="{ field }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Enter your name" v-bind="field" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="surname">
          <FormItem>
            <FormLabel>Surname</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your surname"
                v-bind="field"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email"
                v-bind="field"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="playtomic_url">
          <FormItem>
            <FormLabel>Playtomic URL</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="Enter the Playtomic URL"
                v-bind="field"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button variant="outline" :disabled="isSubmitting" type="submit">
        {{ isSubmitting ? "Creating..." : "Submit" }}
      </Button>
    </CardFooter>
  </Card>
</template>
