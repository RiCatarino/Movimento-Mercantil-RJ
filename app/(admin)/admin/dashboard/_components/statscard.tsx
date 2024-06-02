// import { Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StatsCard(props: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  //   percentage: number;
}) {
  const { title, value, icon } = props;
  return (
    <Card className=' drop-shadow-lg w-full hover:bg-blue-100 hover:scale-105 transition-all duration-300'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {/* <Users className='w-4 h-4 text-muted-foreground' /> */}
        <div className='ml-2 text-blue-500'>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className='text-xl  font-bold text-blue-500'>{value}</div>
        {/* <p className="text-xs text-muted-foreground">+180.1% from last month</p> */}
      </CardContent>
    </Card>
  );
}
