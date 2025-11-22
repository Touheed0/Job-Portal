import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import useFetch from "@/hooks/use-fetch"
import { addNewCompany } from "@/api/apiCompanies"
import { BarLoader } from "react-spinners"
import { useEffect } from "react"

const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z
        .any()
        .refine((file) => file?.length > 0, {
            message: "logo is required",
        })
        .refine(
            (file) =>
                [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                    "image/webp",
                    "image/gif",
                ].includes(file[0]?.type),
            { message: "Only image files are allowed (PNG, JPG, JPEG, WEBP, GIF)" }
        ),
})

const AddCompanyDrawer = ({ fetchCompanies }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const {
        loading: loadingAddCompant,
        error: errorAddCompany,
        data: dataAddCompany,
        fn: fnAddCompany
    } = useFetch(addNewCompany);

    useEffect(() => {
        if (dataAddCompany?.length > 0) {
            fetchCompanies();
        }
    }, [loadingAddCompant]);

    const onSubmit = (data) => {
        fnAddCompany({
            ...data,
            logo: data.logo[0]
        })
    };

    return (
        <>
            <Drawer>
                <DrawerTrigger>
                    <Button type="button" size="sm" variant="secondary" className="cursor-pointer">
                        Add Company
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Add a New Company</DrawerTitle>
                    </DrawerHeader>

                    <form className="flex gap-2 p-4 pb-0">
                        <Input placeholder="Company Name"  {...register("name")} />
                        <Input type="file" accept="image/*" className="file:text-gray-500" {...register("logo")} />

                        <Button type="button" onClick={handleSubmit(onSubmit)} variant="destructive" className="w-40">
                            Add
                        </Button>
                    </form>
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}

                    {errorAddCompany?.message && <p className="text-red-500">{errorAddCompany?.message}</p>}
                    {loadingAddCompant && <BarLoader width={"100%"} color="#36d7b7" />}

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="secondary" type="button">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AddCompanyDrawer