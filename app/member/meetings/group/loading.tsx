import {Skeleton} from "@/components/ui/skeleton"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

export default function PartyGroupMeetingsLoading() {
	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex justify-between items-center">
				<Skeleton className="h-10 w-[200px]"/>
				<Skeleton className="h-10 w-[180px]"/>
			</div>

			<Tabs defaultValue="upcoming" className="w-full">
				<TabsList className="grid w-full max-w-md grid-cols-2">
					<TabsTrigger value="upcoming" disabled>
						即将召开
					</TabsTrigger>
					<TabsTrigger value="past" disabled>
						历史记录
					</TabsTrigger>
				</TabsList>

				<TabsContent value="upcoming" className="space-y-4 mt-6">
					{[1, 2].map((i) => (
						<Card key={i}>
							<CardHeader>
								<Skeleton className="h-6 w-[70%] mb-2"/>
								<Skeleton className="h-4 w-[50%]"/>
							</CardHeader>
							<CardContent>
								<Skeleton className="h-4 w-[40%]"/>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Skeleton className="h-10 w-[100px]"/>
								<Skeleton className="h-10 w-[100px]"/>
							</CardFooter>
						</Card>
					))}
				</TabsContent>
			</Tabs>
		</div>
	)
}
