import {Skeleton} from "@/components/ui/skeleton"
import {Card, CardContent, CardHeader} from "@/components/ui/card"

export default function PortraitsLoading() {
	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex flex-col md:flex-row justify-between gap-4">
				<Skeleton className="h-8 w-[150px]"/>
				<div className="flex flex-col sm:flex-row gap-2">
					<Skeleton className="h-10 w-[200px]"/>
					<Skeleton className="h-10 w-[180px]"/>
					<Skeleton className="h-10 w-10"/>
					<Skeleton className="h-10 w-10"/>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="lg:col-span-1 border-red-500 bg-red-50">
					<CardHeader>
						<Skeleton className="h-6 w-[120px] mb-2"/>
						<Skeleton className="h-4 w-[180px]"/>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{Array(5)
								.fill(0)
								.map((_, i) => (
									<div key={i} className="flex items-center p-3 rounded-md">
										<Skeleton className="h-10 w-10 rounded-full mr-3"/>
										<div className="flex-1">
											<div className="flex justify-between">
												<Skeleton className="h-5 w-[80px] mb-2"/>
												<Skeleton className="h-4 w-[60px]"/>
											</div>
											<Skeleton className="h-4 w-[120px]"/>
										</div>
									</div>
								))}
						</div>
					</CardContent>
				</Card>

				<div className="lg:col-span-2">
					<Card className="border-red-500 bg-red-50">
						<CardHeader className="pb-2">
							<div className="flex justify-between items-start">
								<div className="flex items-center">
									<Skeleton className="h-12 w-12 rounded-full mr-4"/>
									<div>
										<Skeleton className="h-6 w-[100px] mb-2"/>
										<Skeleton className="h-4 w-[150px]"/>
									</div>
								</div>
								<Skeleton className="h-9 w-[120px]"/>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
								{Array(3)
									.fill(0)
									.map((_, i) => (
										<div key={i}>
											<Skeleton className="h-4 w-[80px] mb-2"/>
											<Skeleton className="h-5 w-[60px]"/>
										</div>
									))}
							</div>
						</CardContent>
					</Card>

					<div className="mt-6">
						<Skeleton className="h-10 w-full mb-4"/>
						<Card className="border-red-500 bg-red-50">
							<CardHeader>
								<Skeleton className="h-6 w-[150px] mb-2"/>
								<Skeleton className="h-4 w-[200px]"/>
							</CardHeader>
							<CardContent>
								<Skeleton className="h-[400px] w-full"/>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<Card className="border-red-500 bg-red-50">
				<CardHeader>
					<Skeleton className="h-6 w-[150px] mb-2"/>
					<Skeleton className="h-4 w-[250px]"/>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Skeleton className="h-[350px] w-full"/>
						<Card className="border-red-500 bg-red-50">
							<CardHeader>
								<Skeleton className="h-6 w-[120px]"/>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{Array(3)
										.fill(0)
										.map((_, i) => (
											<div key={i}>
												<Skeleton className="h-5 w-[100px] mb-2"/>
												<Skeleton className="h-4 w-full mb-1"/>
												<Skeleton className="h-4 w-[80%]"/>
											</div>
										))}
								</div>
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
