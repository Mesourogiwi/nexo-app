import React, {useEffect} from 'react'
import {Box} from '@/components/ui/box'
import {Text} from '@/components/ui/text'

import {Button, ButtonText} from '@/components/ui/button'
import {useRouter} from 'expo-router'
import {Image} from '@/components/ui/image'
import {Center} from '@/components/ui/center'
import {getAccessToken} from '@/services/storage'
import * as SecureStore from 'expo-secure-store'

export default function Home() {
  const router = useRouter()
  // useEffect(() => {
  //   if (SecureStore.getItem('accessToken')) {
  //     router.replace('/map')
  //   }
  // }, [SecureStore])
  return (
    <Box
      className="flex-1 bg-background-0 mt-20 mx-8 self-center justify-self-center"
      style={{marginTop: 150}}
    >
      <Center>
        <Image size="2xl" source={require('../assets/images/nexo.png')} />
      </Center>
      <Box className="mt-8">
        <Text className="text-3xl color-blue-600 font-bold mb-2">Mobilidade com propósito.</Text>
        <Text className="color-blue-600 mb-8 font-bold text-3xl">Bem vindo ao Nexo!</Text>
      </Box>
      <Box className="flex-1 gap-2">
        <Button
          className="bg-blue-600 rounded-full active:bg-blue-400"
          onPress={() => router.push('/map')}
        >
          <ButtonText>Primeiro Acesso</ButtonText>
        </Button>
        <Button
          className="bg-gray-300 color-blue-600 rounded-full"
          onPress={() => router.push('/login')}
        >
          <ButtonText className="color-blue-600">Entrar</ButtonText>
        </Button>
      </Box>
    </Box>
  )
}
