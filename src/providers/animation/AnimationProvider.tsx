
import Lottie from 'lottie-react';

interface Props {
    animation: unknown,
    height?: number
}

export const AnimationProvider = ({ animation, height = 300 }: Props) => <Lottie animationData={animation} loop={true} autoplay={true} style={{ height: height }} />



