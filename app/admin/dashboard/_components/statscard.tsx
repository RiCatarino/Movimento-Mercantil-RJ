// import { Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StatsCard(props: {
  title: string;
  value: number;
  icon: React.ReactNode;
  //   percentage: number;
}) {
  const { title, value, icon } = props;
  return (
    <Card className='  drop-shadow-lg'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {/* <Users className='h-4 w-4 text-muted-foreground' /> */}
        <div className='text-blue-500 ml-2'>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold text-blue-500'>{value}</div>
        {/* <p className="text-xs text-muted-foreground">+180.1% from last month</p> */}
      </CardContent>
    </Card>
  );
}
