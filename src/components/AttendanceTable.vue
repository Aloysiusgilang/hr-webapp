<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell class="hidden sm:table-cell">
              <img
                alt="Product image"
                class="aspect-square rounded-md object-cover"
                height="64"
                src=""
                width="64"
              />
            </TableCell>
            <TableCell class="font-medium"> 2023-07-12 10:42 AM </TableCell>
            <TableCell>
              <Badge variant="outline"> Draft </Badge>
            </TableCell>
            <TableCell class="hidden md:table-cell"> </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  </main>
</template>
