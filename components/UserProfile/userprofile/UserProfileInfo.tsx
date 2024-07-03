import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/axios/instance';
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from '@/hooks/useAuth';
import { instancePrivate } from '@/axios/instance';

function UserProfileInfo() {
    const f = useTranslations("Form");
    const { auth } :any= useAuth();

    const { data: userInfo, isLoading } = useQuery({
        queryFn: () => getUser(instancePrivate),
        queryKey: ['userInfo'],
    });

    if (isLoading) {
        return (
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Skeleton className="w-[128px] max-w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="w-[160px] max-w-full" />
                        </TableCell>
                    </TableRow>
                   
                </TableBody>
            </Table>
        );
    }

    return (
        <Table>
            <TableCaption>Your Information</TableCaption>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">{f("firstName")}</TableCell>
                    <TableCell>{userInfo?.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("lastName")}</TableCell>
                    <TableCell>{userInfo?.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("email")}</TableCell>
                    <TableCell>{userInfo?.email}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("phoneNumber")}</TableCell>
                    <TableCell>{userInfo?.mobile}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("dateOfBirth")}</TableCell>
                    <TableCell>{userInfo?.dateOfBirth}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("gender")}</TableCell>
                    <TableCell>{userInfo?.gender}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default UserProfileInfo;
