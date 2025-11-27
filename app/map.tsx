import React, {useEffect, useMemo, useRef, useState} from 'react'
import MapView, {Marker, Callout} from 'react-native-maps'
import * as Location from 'expo-location'
import {Button, ButtonIcon} from '@/components/ui/button'
import {AddIcon, Icon, CloseIcon} from '@/components/ui/icon'
import {Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody} from '@/components/ui/modal'
import {Heading} from '@/components/ui/heading'
import {Text} from '@/components/ui/text'
import {Box} from '@/components/ui/box'
import {Image} from '@/components/ui/image'
import {Pressable} from 'react-native'
import {View} from '@/components/Themed'
import {useRouter} from 'expo-router'
import {api} from '@/api/client'
import Toast from 'react-native-toast-message'
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet'

type MarkerType = {
  id: string
  latitude: number
  longitude: number
  type: 'POSITIVE' | 'NEGATIVE'
  ratings: RatingType[]
}

type RatingType = {
  description: string
  ratingType: 'POSITIVE' | 'NEGATIVE'
  debility: 'VISION' | 'HEAR' | 'COGNITIVE' | 'AUTISM' | 'MOBILITY' | 'SPEECH'
  user: {
    name: string
  }
  createdAt: Date
  fileUrl?: string
  upvotes?: number
  downvotes?: number
}

const debilityMap: Record<RatingType['debility'], string> = {
  VISION: 'Visão',
  HEAR: 'Audição',
  COGNITIVE: 'Cognitiva',
  AUTISM: 'Autismo',
  MOBILITY: 'Mobilidade',
  SPEECH: 'Fala'
}

function getDebilityLabel(debility: RatingType['debility'] | null) {
  if (!debility) return ''
  return debilityMap[debility] || debility
}

export default function MapScreen() {
  const [showModal, setShowModal] = useState(false)
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [isAddingPoint, setIsAddingPoint] = useState<boolean>(false)
  const [buttonVisible, setButtonVisible] = useState(true)
  const [description, setDescription] = useState('')
  const [ratingCreatedAt, setRatingCreatedAt] = useState<Date | null>(null)
  const [userName, setUserName] = useState('')
  const [avaliationImage, setAvaliationImage] = useState<string | null>(null)
  const [ratingType, setRatingType] = useState<'POSITIVE' | 'NEGATIVE' | null>(null)
  const [debilityRatingType, setDebilityRatingType] = useState<
    'VISION' | 'HEAR' | 'COGNITIVE' | 'AUTISM' | 'MOBILITY' | 'SPEECH' | null
  >(null)
  const [debilityType, setDebilityType] = useState<
    'Vision' | 'Hear' | 'Cognitive' | 'Autism' | 'Mobility' | 'Speech' | null
  >(null)
  const [markers, setMarkers] = useState<Array<MarkerType>>([])
  const router = useRouter()

  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => ['25%', '50%', '75%'], [])

  const openSheet = () => {
    setButtonVisible(false)
    bottomSheetRef.current?.snapToIndex(0)
  }

  const closeSheet = () => {
    setButtonVisible(true)
    bottomSheetRef.current?.close()
  }

  useEffect(() => {
    ;(async () => {
      const {status} = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        return
      }

      const current = await Location.getCurrentPositionAsync({})
      setLocation(current)
    })()
  }, [])

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await api.get('/point')
        setMarkers(
          response.data.map(
            (marker: MarkerType): MarkerType => ({
              id: marker.id,
              latitude: Number(marker.latitude),
              longitude: Number(marker.longitude),
              type: marker.type,
              ratings: marker.ratings
            })
          )
        )
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao carregar os marcadores do mapa.'
        })
      }
    }
    fetchMarkers()
  }, [])

  return (
    <View className="flex-1 ">
      <MapView
        style={{flex: 1}}
        className="h-4/5"
        followsUserLocation
        showsUserLocation
        onPress={e => {
          if (!isAddingPoint) return

          const {latitude, longitude} = e.nativeEvent.coordinate

          setIsAddingPoint(false)

          router.setParams({lat: latitude, lon: longitude, debilityType})
          router.push({
            pathname: '/markerDetailsForm',
            params: {lat: latitude, lon: longitude, debilityType}
          })
        }}
        region={
          location
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }
            : undefined
        }
      >
        {markers.map(m => {
          return (
            <Marker
              key={m.id}
              pinColor={m.type === 'POSITIVE' ? 'green' : 'red'}
              coordinate={{latitude: m.latitude, longitude: m.longitude}}
              onPress={() => {
                setDescription(m.ratings[0]?.description || '')
                setUserName(m.ratings[0]?.user.name || '')
                setRatingType(m.ratings[0]?.ratingType || null)
                setDebilityRatingType(m.ratings[0]?.debility || null)
                setRatingCreatedAt(
                  m.ratings[0]?.createdAt ? new Date(m.ratings[0]?.createdAt) : null
                )
                setAvaliationImage(m.ratings[0]?.fileUrl || null)
                openSheet()
              }}
            />
          )
        })}
      </MapView>

      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={-1}>
        <BottomSheetView>
          <Box className="flex-row justify-between p-2">
            <Text size={'3xl'} bold>
              Avaliações sobre o ponto
            </Text>
            <Button className="self-end rounded-full p-3.5" onPress={() => closeSheet()}>
              <ButtonIcon as={CloseIcon} size="md" />
            </Button>
            {/* <Pressable
              onPress={() => {
                closeSheet()
              }}
            >
              <Icon as={CloseIcon} size="xl" color="red" />
            </Pressable> */}
          </Box>
          <Box className={`p-2 gap-2 ${ratingType === 'POSITIVE' ? 'bg-green-200' : 'bg-red-200'}`}>
            <Box className="flex-row gap-2">
              <Text bold size="xl">
                O local é acessível?
              </Text>
              <Text size="xl">{ratingType === 'POSITIVE' ? 'Sim' : 'Não'}</Text>
            </Box>
            <Box className="flex-row gap-2">
              <Text bold size="xl">
                Categoria:
              </Text>
              <Text size="xl">{getDebilityLabel(debilityRatingType)}</Text>
            </Box>
            <Box className="flex-row gap-2">
              <Text bold size="xl">
                Descrição:
              </Text>
              <Text size="xl">{description}</Text>
            </Box>
            {avaliationImage && (
              <Box>
                <Image source={{uri: avaliationImage}} size={'2xl'} />
              </Box>
            )}
            {/* <Box className="flex-row gap-2">
              <Text bold size="xl">
                Autor:
              </Text>
              <Text size="xl">{userName}</Text>
            </Box>
            <Box className="flex-row gap-2">
              <Text bold size="xl">
                Data da avaliação:
              </Text>
              <Text size="xl">{ratingCreatedAt ? ratingCreatedAt.toLocaleDateString() : ''}</Text>
            </Box> */}
            <Box>
              <Text italic size="md" bold className="text-gray-500">
                {userName} - {ratingCreatedAt ? ratingCreatedAt.toLocaleDateString() : ''}
              </Text>
            </Box>
          </Box>
        </BottomSheetView>
      </BottomSheet>

      {/* <View
        className={`absolute h-2/6 w-full bottom-0 bg-white rounded shadow z-10 ${
          sideMenuVisible ? 'block' : 'hidden'
        }`}
      >
        <Box className="p-4">
          <Text className="font-bold mb-2">Menu Lateral</Text>
        </Box>
      </View> */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      >
        <ModalBackdrop />
        <ModalContent className="bg-zinc-900">
          <ModalHeader className="flex-col items-start gap-0.5">
            <Heading className="text-white">
              Selecione a deficiência afetada e escolha um ponto no mapa
            </Heading>
          </ModalHeader>
          <ModalBody className="mb-4 mt-4">
            <Box>
              <Box className="gap-2 flex-row justify-around mt-2">
                <Pressable
                  onPress={() => {
                    setIsAddingPoint(true)
                    setDebilityType('Cognitive')
                    setShowModal(false)
                  }}
                >
                  <Box className="bg-white p-2 rounded">
                    <Image size="sm" source={require('../assets/images/cognitive.png')} />
                  </Box>
                  <Text size="lg" bold className="mt-2 text-center text-white">
                    Cognitiva
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setIsAddingPoint(true)
                    setDebilityType('Mobility')
                    setShowModal(false)
                  }}
                >
                  <Box className="bg-white p-2 rounded">
                    <Image size="sm" source={require('../assets/images/wheel-chair.png')} />
                  </Box>
                  <Text size="lg" bold className="mt-2 text-center text-white">
                    Mobilidade
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setIsAddingPoint(true)
                    setDebilityType('Autism')
                    setShowModal(false)
                  }}
                >
                  <Box className="bg-white p-2 rounded">
                    <Image size="sm" source={require('../assets/images/autism.png')} />
                  </Box>
                  <Text size="lg" bold className="mt-2 text-center text-white">
                    Autismo
                  </Text>
                </Pressable>
              </Box>
              <Box className="gap-2 flex-row justify-around mt-4">
                <Pressable
                  onPress={() => {
                    setIsAddingPoint(true)
                    setDebilityType('Hear')
                    setShowModal(false)
                  }}
                >
                  <Box className="bg-white p-2 rounded">
                    <Image size="sm" source={require('../assets/images/hearing.png')} />
                  </Box>
                  <Text size="lg" bold className="mt-2 text-center text-white">
                    Audição
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setIsAddingPoint(true)
                    setDebilityType('Speech')
                    setShowModal(false)
                  }}
                >
                  <Box className="bg-white p-2 rounded">
                    <Image size="sm" source={require('../assets/images/speech.png')} />
                  </Box>
                  <Text size="lg" bold className="mt-2 text-center text-white">
                    Fala
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setIsAddingPoint(true)
                    setDebilityType('Vision')
                    setShowModal(false)
                  }}
                >
                  <Box className="bg-white p-2 rounded">
                    <Image size="sm" source={require('../assets/images/vision.png')} />
                  </Box>
                  <Text size="lg" bold className="mt-2 text-center text-white">
                    Visão
                  </Text>
                </Pressable>
              </Box>
            </Box>
          </ModalBody>
          {/* <ModalFooter className="flex-col items-start">
            <Button
              variant="link"
              size="sm"
              onPress={() => {
                setShowModal(false)
              }}
              className="gap-1"
            >
              <ButtonIcon as={ArrowLeftIcon} />
              <ButtonText>Back to login</ButtonText>
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
      {buttonVisible && (
        <Button
          style={{height: 60, width: 60}}
          className="bg-blue-600 rounded-full absolute bottom-8 right-8 p-3.5 h-10 w-10"
          onPress={() => setShowModal(true)}
        >
          <ButtonIcon style={{height: 30, width: 30}} as={AddIcon} />
        </Button>
      )}
    </View>
  )
}
