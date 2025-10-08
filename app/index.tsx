import React from 'react';
import Gradient from '@/assets/icons/Gradient';
import Logo from '@/assets/icons/Logo';
import { Box } from '@/components/ui/box';
import { ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';

import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Image } from '@/components/ui/image';
import { Center } from '@/components/ui/center';

const FeatureCard = ({ iconSvg: IconSvg, name, desc }: any) => {
  return (
    <Box
      className="flex-column md:flex-1 m-2 p-4 rounded-lg bg-background-0/40"
      key={name}
    >
      <Box className="items-center flex flex-row">
        <Icon as={IconSvg}/>
        <Text className="font-medium ml-2 text-xl">{name}</Text>
      </Box>
      <Text className="mt-2">{desc}</Text>
    </Box>
  );
};


export default function Home() {
  const router = useRouter();
  return (
    <Box className="flex-1 bg-background-0 mt-20 mx-8">
      <Center>
        <Image size='3xl' source={require('../assets/images/nexo.png')}/>
      </Center>
      <Box className='mt-8'>
        <Text className="text-3xl color-blue-600 font-bold mb-2">Mobilidade com propósito.</Text>
        <Text className="color-blue-600 mb-8 font-bold text-3xl">Bem vindo ao Nexo!</Text>
      </Box>
      <Box className='flex-1 gap-2'>
        <Button className='bg-blue-600 rounded-full active:bg-blue-400'>
          <ButtonText 
          // onPress={() => router.push('/login')} 
          >
          Primeiro Acesso
          </ButtonText>
        </Button>
        <Button className='bg-gray-300 color-blue-600 rounded-full'>
          <ButtonText className='color-blue-600'
          // onPress={() => router.push('/register')} 
          >
          Entrar
          </ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
