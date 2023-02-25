import { FC } from "react";
import styles from './algorithm-container.module.css'
export const AlgorithmContainer: FC = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}