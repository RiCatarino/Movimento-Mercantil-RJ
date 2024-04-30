// import { Users } from 'lucide-react';

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";

export default function StatsCard(props: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  href: string;
  //   percentage: number;
}) {
  const { title, value, icon, description, href } = props;
  return (
    <Card className="drop-shadow-lg grow w-1/2">
      <CardHeader className="flex flex-row items-center justify-between pb-0 space-y-0 pt-0">
        <CardTitle className="text-l font-bold">{title}</CardTitle>
        {/* <Users className="w-4 h-4 text-muted-foreground" /> */}
        <div
          //style={{ backgroundColor: "red" }}
          className="h-20 w-20 ml-2 pt-5 text-blue-500"
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold text-black">
          <h2> Registos - {value}</h2>
        </div>
        {/* <p className="text-xs text-muted-foreground">+180.1% from last month</p> */}
      </CardContent>
      <CardFooter>
        <div className="text-l font-bold text-blue-500">{description}</div>
        <div className="text-l font-bold text-black">{description}</div>
      </CardFooter>
      <div
        className="flex items-center m-0 p-0 rounded-l justify-center"
        // style={{ backgroundColor: "red" }}
      >
        <Button
          asChild
          className="text-white shadow-2xl h-12 w-1/3 transition-all duration-300 bg-blue-400 rounded-m hover:scale-105 hover:bg-blue-600 active:scale-95"
        >
          <Link href={href}> Conheça os registos </Link>
        </Button>
      </div>
    </Card>
  );
}
