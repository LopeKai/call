import { useForm } from "react-hook-form"
import { Button, Text, TextInput } from "@ignite-ui/react"
import { ArrowArcLeft } from "phosphor-react"

import { Form, FormAnnotation } from "./styles"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/router"

const claimUserNameFormSchema = z.object({
    username: z.string()
        .min(3, { message: 'O usuário precisa ter plo menos 3 letras.' })
        .regex(/^([a-z\\-]+)$/i, {
            message: 'O usuário pode ter apenas letras e hifens.'
        })
        .transform(username => username.toLowerCase())
})

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormSchema>

export default function ClaimUserNameForm() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClaimUserNameFormData>({
        resolver: zodResolver(claimUserNameFormSchema)
    })

    async function handleClaimUsername(data: ClaimUserNameFormData) {
        const { username } = data

        await router.push(`/register?username=${username}`)
    }

    return (
        <>
            <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
                <TextInput
                    size="sm"
                    prefix="ignite.com/"
                    placeholder="seu-usuário"
                    {...register('username')}
                />

                <Button
                    size="sm"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Reservar
                    <ArrowArcLeft />
                </Button>
            </Form>

            <FormAnnotation>
                <Text size="sm">
                    {errors.username ? errors.username.message : 'Digite o nome do usuário desejado.'}
                </Text>
            </FormAnnotation>
        </>
    )
}