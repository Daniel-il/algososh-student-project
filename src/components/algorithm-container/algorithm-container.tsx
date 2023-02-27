import { FC } from "react";
import styles from './algorithm-container.module.css'
type TContainerProps = {
    extraClass?: string;
}
export const AlgorithmContainer: FC<TContainerProps> = ({children, extraClass}) => {
    return (
        <div className={`${styles.container} ${extraClass}`}>
            {children}
        </div>
    )
}