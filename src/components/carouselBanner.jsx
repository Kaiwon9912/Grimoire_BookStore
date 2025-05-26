// components/CarouselBanner.jsx
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const Autoplay = (slider) => {
  let timeout
  let mouseOver = false

  function clearNextTimeout() {
    clearTimeout(timeout)
  }

  function nextTimeout() {
    clearTimeout(timeout)
    if (mouseOver) return
    timeout = setTimeout(() => {
      slider.next()
    }, 4000)
  }

  slider.on('created', () => {
    slider.container.addEventListener('mouseover', () => {
      mouseOver = true
      clearNextTimeout()
    })
    slider.container.addEventListener('mouseout', () => {
      mouseOver = false
      nextTimeout()
    })
    nextTimeout()
  })

  slider.on('dragStarted', clearNextTimeout)
  slider.on('animationEnded', nextTimeout)
  slider.on('updated', nextTimeout)
}

const bannerImages = [
  {
    id: 1,
    title: 'Chào mừng đến với Grimoire',
    subtitle: 'Khám phá kho sách phép thuật cổ đại',
    image: 'https://creator.nightcafe.studio/jobs/MjC23SRAUEzgv2Sv41wi/MjC23SRAUEzgv2Sv41wi--3--t7en2.jpg',
  },
  {
    id: 2,
    title: 'Học giả & Phù thủy',
    subtitle: 'Sách bí truyền dành cho người khôn ngoan',
    image: 'https://t4.ftcdn.net/jpg/10/91/70/41/360_F_1091704194_FuE26hmY9IUfAfpLPhMheJpFPB4eW6zY.jpg',
  },
  {
    id: 3,
    title: 'Triệu hồi tri thức',
    subtitle: 'Mỗi cuốn sách là một cánh cổng',
    image: 'https://images6.alphacoders.com/136/1369018.png',
  },
]

const CarouselBanner = () => {
  const [sliderRef] = useKeenSlider(
    { loop: true, slides: { perView: 1 } },
    [Autoplay]
  )

  return (
    <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden shadow-lg">
      {bannerImages.map((banner) => (
        <div key={banner.id} className="keen-slider__slide relative h-48 md:h-64">
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
            <h2 className="text-2xl md:text-4xl font-bangers drop-shadow mb-1">{banner.title}</h2>
            <p className="text-sm md:text-lg font-bangers tracking-widest">{banner.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CarouselBanner
