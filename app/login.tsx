import {Box} from '@/components/ui/box'
import React, {useState} from 'react'
import {login} from '@/api/auth'
import Toast from 'react-native-toast-message'

import {
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabelText
} from '@/components/ui/form-control'
import {Input, InputField} from '@/components/ui/input'
import {Button, ButtonText} from '@/components/ui/button'
import {AlertCircleIcon} from 'lucide-react-native'
import {useRouter} from 'expo-router'
import {VStack} from '@/components/ui/vstack'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Login realizado com sucesso!'
    })
  }

  const showErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Erro ao realizar login. Verifique suas credenciais.'
    })
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      // const request = await axios.post('http://192.168.48.1:3000/auth/login', {email, password})
      // console.log('Request successful:', request.data)
      await login(email, password)
      showSuccessToast()
      router.replace('/map')
    } catch (error) {
      showErrorToast()
      throw error
    } finally {
      setLoading(false)
    }
  }
  return (
    <VStack className="flex-1 bg-background-0 mt-40 mx-8">
      <FormControl size="md" isDisabled={false} isReadOnly={false}>
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="md">
          <InputField
            placeholder="user@example.com"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </Input>
        <FormControlLabel>
          <FormControlLabelText>Senha</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="md">
          <InputField type="password" value={password} onChangeText={text => setPassword(text)} />
        </Input>
        <FormControlHelper>
          <FormControlHelperText>Mínimo de 6 caracteres.</FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
          <FormControlErrorText className="text-red-500">
            Pelo menos 6 caracteres são necessários.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <Button className="mt-4 bg-blue-600" size="lg" onPress={handleSubmit} disabled={loading}>
        <ButtonText>Login</ButtonText>
      </Button>
    </VStack>
  )
}
