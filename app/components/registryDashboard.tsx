// import { Users } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* <Users className='w-4 h-4 text-muted-foreground' /> */}
        <div
          //style={{ backgroundColor: "red" }}
          className="h-20 w-20 ml-2 text-blue-500"
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-blue-500">{value}</div>
        {/* <p className="text-xs text-muted-foreground">+180.1% from last month</p> */}
      </CardContent>
      <CardFooter>
        <div className="text-2xl font-bold text-blue-500">{description}</div>
        <div className="text-2xl font-bold text-black">{description}</div>
      </CardFooter>
      <div
        className="flex items-center m-0 p-0 rounded-l justify-center"
        // style={{ backgroundColor: "red" }}
      >
        <Button className="text-black shadow-2xl h-full w-1/2 transition-all duration-500 bg-gradient-to-r from-blue-200 to-blue-400 rounded-m hover:scale-105 hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-600">
          <Link href={href}> Conheça os registos </Link>
        </Button>
      </div>
    </Card>
  );
}
