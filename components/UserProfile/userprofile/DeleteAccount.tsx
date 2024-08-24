import { deleteUser } from "@/axios/instance";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

export function DeleteAccount() {
	const f = useTranslations("Form");
    const { auth }: any = useAuth();
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="outline"
					className="bg-red-100 hover:bg-red-600 text-red-600 hover:text-white  hover:border-red-600 font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out focus:outline-none  "
				>
					{f("delete")}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{f("dialogAlertTitle")}</AlertDialogTitle>
					<AlertDialogDescription>
						{f("dialogDisc")}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{f("cancel")}</AlertDialogCancel>
					<AlertDialogAction onMouseDown={()=>{deleteUser(auth.userId)
                   redirect('/') }
                    } className="bg-red-100 hover:bg-red-600 text-red-600 hover:text-white  hover:border-red-600 font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none  ">
						{f("continue")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
