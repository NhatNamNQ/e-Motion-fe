import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef } from 'react'
import { LocateFixed } from 'lucide-react'

const MapboxMap = ({ station }) => {
  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [station.lng, station.lat],
      zoom: 17
    })

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([station.lng, station.lat])
      .addTo(mapRef.current)

    return () => {
      mapRef.current.remove()
    }
  }, [station])

  const handleCenter = () => {
    mapRef.current.flyTo({
      center: [station.lng, station.lat],
      zoom: 17
    })
  }

  return (
    <div className='relative'>
      <LocateFixed
        onClick={handleCenter}
        className='bg-background text-secondary absolute right-3 bottom-6 z-10 h-12 w-12 cursor-pointer rounded-full border p-2'
      />
      <div className='mb-6 h-96 w-full' ref={mapContainerRef} />
    </div>
  )
}

export default MapboxMap
