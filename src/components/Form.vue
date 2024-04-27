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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const isSubmitting = ref(false);

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    surname: z.string().min(2).max(50),
    email: z.string().email(),
    playtomic_url: z.string().url(),
    court_side: z.enum(["left", "right"]), // New field for court side
    paddle_type: z.string().min(1), // New field for paddle type
    age: z.number().min(1), // New field for age, must be a positive number
    playtomic_ranking: z.number().min(0).max(5), // New field for ranking, must be a non-negative number
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

        <FormField v-slot="{ field }" name="court_side">
          <FormItem>
            <FormLabel>Court Side</FormLabel>
            <FormControl>
              <Select v-bind="field">
                <SelectTrigger>
                  <SelectValue placeholder="Select Court Side" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="paddle_type">
          <FormItem>
            <FormLabel>Paddle Type</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter Paddle Type"
                v-bind="field"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="age">
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter Your Age"
                v-bind="field"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="playtomic_ranking">
          <FormItem>
            <FormLabel>Playtomic Ranking</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter Your Playtomic Ranking"
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
