import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { Transactions } from './pages/Transactions'
import{ GlobalStyle } from './styles/global'
import { TransactionsProvider } from './Contexts/TransactionsContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
