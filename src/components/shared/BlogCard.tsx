import Image from 'next/image'
import Link from 'next/link'

const BlogCard = ({ width, item }: { width: string; item: any }) => {
  const { title, content, image,id } = item
 
  

  const type: String[] = [
    'laptop',
    'man',
    'woman',
    'android',
    'iphone',
    'windows',
  ]
  return (
    <div
      className={`${
        width === 'two' ? 'w-[95%]' : 'w-[45%] md:w-[30%]'
      } m-2 md:m-4 rounded-2xl overflow-hidden border-b border-primary-focus hover:shadow-lg hover:shadow-black bg-stone-800`}
    >
      <Link href={`blog/${id}`}>
        <div className="card bg-base-100 shadow-xl rounded-none">
          <figure>
            <div
              className={`relative w-full h-28 ${
                width === 'two' ? 'md:h-80' : 'md:h-44'
              }`}
            >
              <Image
                fill={true}
                className={`h-28 w-full object-cover ${
                  width === 'two' ? 'md:h-80' : 'md:h-44'
                }`}
                src={
                  image
                }
                alt="Shoes"
              />
            </div>
          </figure>
          <div
            className={`card-body gap-0 p-2 pb-2 my-2 ${
              width === 'two' ? 'md:p-4' : 'md:p-2'
            }`}
          >
            <h2
              className={`${
                width === 'two' ? 'md:text-3xl' : 'md:text-lg'
              } font-bold line-clamp-2`}
            >
              {title}
            </h2>
            <p className="line-clamp-3">
              {content}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogCard
