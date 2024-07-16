import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { useTranslations } from 'next-intl';
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteAccount } from "./DeleteAccount";
import NotFound from "@/app/not-found";

function UserProfileInfo({ userInfo, isLoading, isError, error }) {
    const f = useTranslations("Form");

    const { name, email, mobile, createdAt } = userInfo || {};

    if (isError) {
        return <NotFound />;
    }

    return (
        <Table>
            <TableCaption>Your Information</TableCaption>
            <TableBody>
                {isLoading ? (
                    Array.from({ length: 8 }, (_, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Skeleton className="w-full h-[20px] bg-gray-300" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-[20px]" />
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <>
                        <TableRow>
                            <TableCell className="font-medium">{f("name")}</TableCell>
                            <TableCell>{name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">{f("email")}</TableCell>
                            <TableCell>{email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">{f("phoneNumber")}</TableCell>
                            <TableCell>{mobile}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">{f("delete")}</TableCell>
                            <TableCell><DeleteAccount /></TableCell>
                        </TableRow>
                    </>
                )}
            </TableBody>
        </Table>
    );
}

export default UserProfileInfo;