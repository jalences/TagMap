import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface ImageListProps {
  images: string[];
  removeImage: (uri: string) => void;
  addImage: () => void;
}

export default function ImageList({ images, removeImage, addImage }: ImageListProps) {
  const screenWidth = Dimensions.get('window').width;
  const imageSize = (screenWidth - 70) / 3; 
  const data = [...images, "add_button"];

  return (
    <FlatList
  data={data}
  keyExtractor={(item, index) => index.toString()}
  numColumns={3}
  contentContainerStyle={styles.list}
  renderItem={({ item }) => {
    if (item === "add_button") {
      return (
        <Pressable
          style={[styles.imageContainer, { width: imageSize, height: imageSize }]}
          onPress={addImage}   
        >
          <Text style={styles.plus}>+</Text>
        </Pressable>
      );
    }

    return (
      <View style={[styles.imageContainer, { width: imageSize, height: imageSize }]}>
        <Image source={{ uri: item }} style={styles.image} />

        <Pressable style={styles.closeButton} onPress={() => removeImage(item)}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
      </View>
    );
  }}
/>
    // <FlatList
    //   data={images}
    //   keyExtractor={(item) => item}
    //   numColumns={3}
    //   contentContainerStyle={styles.list}
    //   renderItem={({ item }) => (
    //     <View style={[styles.imageContainer, { width: imageSize, height: imageSize }]}>
    //       <Image source={{ uri: item }} style={styles.image} />
    //       <Pressable style={styles.closeButton} onPress={() => removeImage(item)}>
    //         <Text style={styles.closeText}>✕</Text>
    //       </Pressable>
    //     </View>
    //   )}
    // />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 4,
    justifyContent: 'center',
  },
  imageContainer: {
    margin: 4,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
plus: {
  width: '100%',
  height: '100%',
  fontSize: 60,
  color: '#969ea8ff',
  backgroundColor: '#424850ff',
  borderRadius: 12,
  textAlign: 'center',
  textAlignVertical: 'center',    
}
});
