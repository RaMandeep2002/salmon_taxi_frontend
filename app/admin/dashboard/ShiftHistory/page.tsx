"use client";

import { Button } from "@/components/ui/button";
import DashboardLayout from "../../DashBoardLayout";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ShiftHistory() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">
          Shift History
        </h1>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search by name or email..."
              className="w-64 text-white border border-[#F5EF1B] placeholder-white"
            />
            <Button
              variant="outline"
              size="icon"
              className="bg-zinc-800 hover:bg-zinc-800 border border-[#F5EF1B]"
            >
              <Search className="h-4 w-4 text-[#F5EF1B]" />
            </Button>
          </div>
        </div>

        <div className="border border-[#F5EF1B] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="text-center border border-[#F5EF1B]">
                <TableHead className="w-[150px] text-[#F5EF1B] text-lg">
                  Driver Name
                </TableHead>
                <TableHead className="w-[150px] text-[#F5EF1B] text-lg">
                  Start Time and Date
                </TableHead>
                <TableHead className="w-[150px] text-[#F5EF1B] text-lg">
                  End Time and Date
                </TableHead>
                <TableHead className="w-[100px] text-[#F5EF1B] text-lg">
                  Total Earnings 
                </TableHead>
                <TableHead className="w-[100px] text-[#F5EF1B] text-lg">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className="border border-[#F5EF1B]">
                <TableCell className="text-white text-lg">PB11AS1234</TableCell>
                <TableCell className="text-white text-lg">Tata</TableCell>
                <TableCell className="text-white text-lg">Nexon</TableCell>
                <TableCell className="text-white text-lg">2023</TableCell>
                <TableCell className="text-white text-lg">View</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
