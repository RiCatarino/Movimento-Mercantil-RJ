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

export default function InfoCard(props: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  href: string;
  //   percentage: number;
}) {
  const { title, value, icon, description, href } = props;
  return (
    <Card className="p-4 drop-shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pt-0 pb-0 space-y-0">
        <CardTitle className="font-bold text-l">{title}</CardTitle>
        {/* <Users className="w-4 h-4 text-muted-foreground" /> */}
        {/* <div
          //style={{ backgroundColor: "red" }}
          className="w-20 h-20 pt-5 ml-2 text-blue-500"
        >
          {icon}
        </div> */}
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold text-black">
          <h2> Registos - {value}</h2>
        </div>
        {/* <p className="text-xs text-muted-foreground">+180.1% from last month</p> */}
        <div
          className="flex items-center p-0 m-0 rounded-l "
          // style={{ backgroundColor: "red" }}
        >
          <Button
            asChild
            className="text-white bg-blue-400 shadow-2xl transition-all duration-300 rounded-m hover:scale-105 hover:bg-blue-600 active:scale-95"
          >
            <Link href={href}> Conheça os registos </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
