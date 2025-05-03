import {Skeleton} from "@/components/ui/skeleton"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

export default function PortraitEntryLoading() {
	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="space-y-4">
				<div className="flex flex-col md:flex-row justify-between gap-4">
					<Skeleton className="h-8 w-[200px]"/>
					<div className="flex gap-2">
						<Skeleton className="h-10 w-[120px]"/>
						<Skeleton className="h-10 w-[120px]"/>
						<Skeleton className="h-10 w-[120px]"/>
					</div>
				</div>

				<div className="flex flex-col md:flex-row items-center gap-4 bg-muted/30 p-4 rounded-lg border">
					<Skeleton className="h-5 w-[100px]"/>
					<div className="flex gap-2 flex-wrap">
						{Array(5)
							.fill(0)
							.map((_, i) => (
								<Skeleton key={i} className="h-9 w-[120px]"/>
							))}
					</div>
				</div>
			</div>

			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-[150px] mb-2"/>
					<Skeleton className="h-4 w-[250px]"/>
				</CardHeader>
				<CardContent>
					<div className="border rounded-md overflow-auto">
						<Table>
							<TableHeader>
								<TableRow>
									{Array(10)
										.fill(0)
										.map((_, i) => (
											<TableHead key={i} className="text-center">
												<Skeleton className="h-5 w-full"/>
												<Skeleton className="h-3 w-[80%] mx-auto mt-1"/>
											</TableHead>
										))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{Array(5)
									.fill(0)
									.map((_, i) => (
										<TableRow key={i}>
											{Array(10)
												.fill(0)
												.map((_, j) => (
													<TableCell key={j} className="text-center">
														<Skeleton className="h-8 w-full"/>
													</TableCell>
												))}
										</TableRow>
									))}
							</TableBody>
						</Table>
					</div>

					<div className="flex justify-between mt-4">
						<Skeleton className="h-5 w-[120px]"/>
						<div className="flex gap-2">
							<Skeleton className="h-9 w-[100px]"/>
							<Skeleton className="h-9 w-[100px]"/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
