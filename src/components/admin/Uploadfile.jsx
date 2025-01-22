import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/product'
import useEcomStore from '../../store/ecom-store'
import { Loader } from 'lucide-react';

const uploadfile = (props) => {
    const token = useEcomStore((state) => state.token)
    const { form, setForm } = props
    const [isLoading, setIsLoading] = useState(false)

    const handleOnchange = (e) => {
        setIsLoading(true)
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = form.images  // [] empty array
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])

                // Validate
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} is not image`)
                    continue
                }

                // Image Resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // endpoint Backend
                        // console.log(data)
                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res)
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                toast.success('Upload image success!!')
                            })
                            .catch((err) => {
                                setIsLoading(false)
                                console.log(err)
                            })
                    },
                    "base64"
                )
            }

        }
        // console.log(files)
    }
    // console.log(form)

    const handleDelete = (public_id) => {
        // console.log(public_id)
        const images = form.images
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = images.filter((item) => {
                    return item.public_id != public_id
                })
                console.log('filterImages', filterImages)
                setForm({
                    ...form,
                    images: filterImages
                })
                toast.error(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4'>
                {
                    //  false && true
                    isLoading && <Loader className='animate-spin w-8 h-8' />
                }
                {/* <Loader className='animate-spin w-8 h-8' /> */}
                {/* Image */}
                {
                    form.images.map((item, index) =>
                        <div key={index} className='relative'>
                            <img className='w-24 h-24 hover:scale-105' src={item.url} />
                            <span onClick={() => handleDelete(item.public_id)} className='absolute top-0 right-0 p-1 bg-red-500 rounded-md'>X</span>
                        </div>
                    )
                }
            </div>
            <div>
                <input
                    type="file"
                    name="iamges"
                    onChange={handleOnchange}
                    multiple
                    id=""
                />
            </div>

        </div>
    )
}

export default uploadfile