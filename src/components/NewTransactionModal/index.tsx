import * as Dialog from '@radix-ui/react-dialog'
import {
  Overlay,
  Content,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../Contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionsFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['outcome', 'income']),
})
type newTransactionsFormInputs = z.infer<typeof newTransactionsFormSchema>
export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
  } = useForm<newTransactionsFormInputs>({
    resolver: zodResolver(newTransactionsFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: newTransactionsFormInputs) {
    const { category, description, price, type } = data
    await createTransaction({
      description,
      category,
      price,
      type,
    })
    reset()
  }
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New </Dialog.Title>
        <CloseButton>
          <X size={25} />
        </CloseButton>
        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Describe"
            required
            {...register('description')}
          />

          <input
            type="number"
            placeholder="Price"
            required
            {...register('price', { valueAsNumber: true })}
          />

          <input
            type="text"
            placeholder="Categorie"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Enter
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Close
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
