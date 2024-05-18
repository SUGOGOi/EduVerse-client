import Link from 'next/link'
import style from "./not-found.module.scss"

export default async function NotFound() {

    return (
        <section className={style.page_404}>
            <div className={style.container}>
                <div className={style.row}>
                    <div className={style.col_sm_12}>
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className={style.four_zero_four_bg}>
                                <h1 className={style.text_center}>404</h1>
                            </div>

                            <div className={style.contant_box_404}>
                                <h3 className={style.h2}>
                                    Look like you're lost
                                </h3>

                                <p>the page you are looking for not avaible!</p>

                                <Link href="/" className={style.link_404}>Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}