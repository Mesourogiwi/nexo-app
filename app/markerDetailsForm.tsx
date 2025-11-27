import {Box} from '@/components/ui/box'
import {Text} from '@/components/ui/text'
import React, {useEffect, useState} from 'react'
import {Input, InputField} from '@/components/ui/input'
import {Button, ButtonIcon, ButtonText} from '@/components/ui/button'
import {useLocalSearchParams} from 'expo-router'
import {CameraIcon, ThumbsDownIcon, ThumbsUpIcon} from 'lucide-react-native'
import {useRouter} from 'expo-router'

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
import {api} from '@/api/client'
import Toast from 'react-native-toast-message'
import * as ImagePicker from 'expo-image-picker'
import {Image} from '@/components/ui/image'

export default function MarkerDetailsFormScreen() {
  const [description, setDescription] = useState<string>('')
  const [type, setType] = useState<'POSITIVE' | 'NEGATIVE' | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const params = useLocalSearchParams()
  const route = useRouter()

  useEffect(() => {
    ;(async () => {
      const gallery = await ImagePicker.requestMediaLibraryPermissionsAsync()
      const camera = await ImagePicker.requestCameraPermissionsAsync()

      if (!gallery.granted || !camera.granted) {
        alert('Precisamos de permissão para acessar galeria e câmera.')
      }
    })()
  }, [])

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  async function takePhoto() {
    console.log('está aqui')
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()

    if (image) {
      formData.append('file', {
        uri: image,
        name: 'photo.jpg',
        type: 'image/jpeg'
      } as any)
    }

    formData.append('latitude', String(params.lat))
    formData.append('longitude', String(params.lon))
    formData.append('ratingType', type || '')
    formData.append('description', description)
    formData.append('debility', String(params.debilityType).toUpperCase())
    try {
      await api.post('/rating', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      route.replace('/map')
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao enviar a avaliação. Tente novamente.'
      })
      const errorMessage = error.response?.data?.message || error.message
      console.error('Error submitting rating:', errorMessage)
    }
  }

  return (
    <Box className="flex-1 bg-zinc-950">
      <Box className="mt-20 mx-8 gap-6">
        <Text bold size={'2xl'} className="text-white">
          Descreva em detalhes o ponto a ser registrado no mapa
        </Text>
        <Text size={'lg'} className="text-white">
          Esse local atende às necessidades da deficiência selecionada?
        </Text>
        <Box className="flex-row gap-4 justify-center">
          <Button
            size="xl"
            className="rounded-full p-3.5 w-3/12"
            // style={{width: 72, height: 72}}
            action="positive"
            onPress={() => setType('POSITIVE')}
            variant={type === 'POSITIVE' ? 'solid' : 'outline'}
          >
            <ButtonIcon as={ThumbsUpIcon} />
          </Button>
          <Button
            size="xl"
            className="rounded-full p-3.5 w-3/12"
            action="negative"
            onPress={() => setType('NEGATIVE')}
            variant={type === 'NEGATIVE' ? 'solid' : 'outline'}
          >
            <ButtonIcon as={ThumbsDownIcon} />
          </Button>
        </Box>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText className="text-white mb-2">
              Descreva o motivo do registro:
            </FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              className="text-white"
              type="text"
              placeholder="Detalhes sobre o local..."
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </Input>
        </FormControl>
        <Text className="text-white">
          Anexe uma imagem que represente ou comprove o local mencionado
        </Text>
        {image && (
          <Box className="mt-4 items-center">
            <Image source={{uri: image}} size={'2xl'} />
          </Box>
        )}
        <Button
          className="w-fit self-center rounded-lg bg-blue-600"
          size="lg"
          onPress={() => takePhoto()}
        >
          <ButtonText>Anexar</ButtonText>
          <ButtonIcon as={CameraIcon} />
        </Button>
        <Button onPress={handleSubmit} className="bg-blue-600">
          <ButtonText>Enviar</ButtonText>
        </Button>
      </Box>
    </Box>
  )
}
