<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { firestore } from "@/lib/firebase-config";
import { ref } from "vue";
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
  <form @submit="onSubmit" class="space-y-7">
    <FormField v-slot="{ field }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter your name" v-bind="field" />
        </FormControl>
        <FormDescription> This is your first name. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ field }" name="surname">
      <FormItem>
        <FormLabel>Surname</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter your surname" v-bind="field" />
        </FormControl>
        <FormDescription> This is your family name. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ field }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Enter your email" v-bind="field" />
        </FormControl>
        <FormDescription> This is your contact email. </FormDescription>
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
        <FormDescription> This is the URL for Playtomic. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button variant="outline" :disabled="isSubmitting" type="submit">{{
      isSubmitting ? "Creating..." : "Submit"
    }}</Button>
  </form>
</template>
