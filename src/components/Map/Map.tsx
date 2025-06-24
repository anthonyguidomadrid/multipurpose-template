import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { CONTAINER_STYLE, Spinner } from './Map.styles'

export const Map = ({ lat, lon }: { lat: number; lon: number }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  if (!isLoaded) return <Spinner />

  return (
    <GoogleMap
      mapContainerStyle={CONTAINER_STYLE}
      center={{ lat, lng: lon }}
      zoom={13}
    >
      <Marker position={{ lat, lng: lon }} />
    </GoogleMap>
  )
}
