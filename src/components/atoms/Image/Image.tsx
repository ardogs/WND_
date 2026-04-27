import { Image as AntImage, ImageProps as AntImageProps } from "antd";

interface Props extends Omit<AntImageProps, 'src' | 'alt' | 'width' | 'height'> {
    src: string,
    alt: string,
    width: number,
}
export const Image = ({ src, alt, width,  preview = false, ...rest }: Props) => {
    return (
        <AntImage src={src} preview={preview} width={width} alt={alt} {...rest} />
    )
};



