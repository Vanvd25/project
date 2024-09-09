import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'

export default function Home() {
  return (
    <main>
      <Slider />
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', color: 'red' }}>
      
      
        CÁC SẢN PHẨM NỔI BẬT CỦA CHÚNG TÔI
      

      </h1>
      <Featured />
      <Offer />
    </main>
  )
}
