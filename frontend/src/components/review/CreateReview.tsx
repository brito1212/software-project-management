import React, { useState } from 'react'
import Input from '../forms/Input'
import { useAppDispatch } from '../../app/store';
import useForm from '../../hooks/useForm';

import stylesReview from './CreateReview.module.css'

import { Rating } from 'react-simple-star-rating'

export const CreateReview = () => {
  const dispatch = useAppDispatch();
  const title = useForm("");
  const [content, setContent] = useState("")

  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)
  }

  async function handleSubmit(event: React.FormEvent) {
    console.log("submit");
    event.preventDefault();
    console.log("Rating:", rating)
    console.log("Title:", title.value)
    console.log("Content:", content)
    // dispatch();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={stylesReview.rate}>
        <p>Dê uma nota:</p>
        <Rating onClick={handleRating} initialValue={rating} size={34}></Rating>
      </div>
      
      <Input label="Título da review..." placeholder="Título da review..." type="text" name="title" styles={stylesReview} {...title} />
      <textarea
        placeholder="Descrição da review..." 
        name="content" 
        className={stylesReview.textarea} 
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <button className={`btn primary ${stylesReview.button}`}><i className="fa-regular fa-star"></i> Criar Review </button>
    </form>
  )
}

export default CreateReview