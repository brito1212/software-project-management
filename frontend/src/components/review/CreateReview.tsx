import React, { useState } from 'react'
import Input from '../forms/Input'
import { useAppDispatch, useAppSelector } from '../../app/store';
import useForm from '../../hooks/useForm';

import stylesReview from './CreateReview.module.css'

import { Rating } from 'react-simple-star-rating'
import { createReviewAction } from '../../features/review/reviewSlice';
import { Review } from '../../features/review/review.type';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

export const CreateReview = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser)
  const { media, loading, error } = useAppSelector((state) => state.media);

  const title = useForm("");
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log("Rating:", rating)
    console.log("Title:", title.value)
    console.log("Content:", content)

    const reviewData: Review = {
      rate: rating,
      title: title.value,
      content: content,
      midia: media?.id,
      user: user?.id,
      comments: []
    }
    dispatch(
      createReviewAction(
        reviewData,
        () => navigate(0),
        () => console.log("erro")
      )
    );
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