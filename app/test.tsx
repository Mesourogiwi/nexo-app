import React, {useRef} from 'react'
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native'
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import {Menu, X, Home, Settings, User, Heart, Bookmark, Bell} from 'lucide-react-native'

const {width, height} = Dimensions.get('window')

export default function HomeScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const snapPoints = ['40%', '70%']

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present()
  }

  const handleDismissModalPress = () => {
    bottomSheetModalRef.current?.dismiss()
  }

  const menuItems = [
    {id: 1, title: 'Home', icon: Home, color: '#2196F3'},
    {id: 2, title: 'Profile', icon: User, color: '#FF9800'},
    {id: 3, title: 'Favorites', icon: Heart, color: '#F44336'},
    {id: 4, title: 'Bookmarks', icon: Bookmark, color: '#9C27B0'},
    {id: 5, title: 'Notifications', icon: Bell, color: '#03A9F4'},
    {id: 6, title: 'Settings', icon: Settings, color: '#4CAF50'}
  ]

  return (
    <BottomSheetModalProvider>
      <View className="flex-1 bg-gray-100 relative">
        {/* Fullscreen Content */}
        <View className="flex-1">
          {/* Background Image */}
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1505259839540-04105fcd8ba3?w=900&auto=format&fit=crop&q=60'
            }}
            style={{width: width, height: height * 0.6}}
            className="absolute top-0 left-0"
            resizeMode="cover"
          />

          {/* Overlay */}
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/20" />

          {/* Header */}
          <View className="pt-16 px-6 pb-6">
            <Text className="text-white text-3xl font-bold">Nature Explorer</Text>
            <Text className="text-white/90 mt-2 text-lg">Discover the beauty of the wild</Text>
          </View>

          {/* Content Cards */}
          <View className="mt-8 mx-4">
            <View className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
              <Text className="text-gray-800 text-xl font-bold mb-2">Wildlife Photography</Text>
              <Text className="text-gray-600">
                Explore breathtaking wildlife photography from around the world. Capture the essence
                of nature in its purest form.
              </Text>
            </View>

            <View className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <Text className="text-gray-800 text-xl font-bold mb-2">Conservation Efforts</Text>
              <Text className="text-gray-600">
                Learn about ongoing conservation projects and how you can help protect endangered
                species and their habitats.
              </Text>
            </View>
          </View>
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity
          onPress={handlePresentModalPress}
          className="absolute bottom-8 right-6 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-xl"
          activeOpacity={0.8}
        >
          <Menu size={28} color="white" />
        </TouchableOpacity>

        {/* Bottom Sheet Modal */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{backgroundColor: '#F7F7F7'}}
          handleIndicatorStyle={{backgroundColor: '#CCCCCC'}}
        >
          <View className="flex-1 bg-gray-50">
            {/* Bottom Sheet Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
              <Text className="text-xl font-bold text-gray-800">Menu Options</Text>
              <TouchableOpacity onPress={handleDismissModalPress}>
                <X size={24} color="#757575" />
              </TouchableOpacity>
            </View>

            {/* Menu Items */}
            <View className="px-4 pt-2">
              {menuItems.map(item => {
                const IconComponent = item.icon
                return (
                  <TouchableOpacity
                    key={item.id}
                    className="flex-row items-center py-4 px-4 my-2 bg-white rounded-xl shadow-sm"
                    activeOpacity={0.7}
                  >
                    <View
                      className="w-12 h-12 rounded-full items-center justify-center mr-4"
                      style={{backgroundColor: `${item.color}20`}}
                    >
                      <IconComponent size={20} color={item.color} />
                    </View>
                    <Text className="text-lg text-gray-800 font-medium">{item.title}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            {/* Footer */}
            <View className="px-6 py-4 mt-auto">
              <TouchableOpacity className="bg-blue-500 py-4 rounded-xl items-center">
                <Text className="text-white font-bold text-lg">Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}
