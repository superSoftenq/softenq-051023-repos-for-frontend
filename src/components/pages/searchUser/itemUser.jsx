import style from "./itemUser.module.css"

export const ItemUser = (props) => {

    return (
        <div className={style.mainContent}>
           

            <div className={style.profilePicture}>
                <img src="https://yandex-images.clstorage.net/S5Cj6a129/9bd1fbnBE0w6/c5fcvOYdxn2LRujK8D1GlhLQQWctQ6BVsNRl2h4yAaF6LFSvfTk6ZAV0nPwN-qhinGJECzR0m8KNhWAYRfY4P1ejGIj3iEMZOjJMCoCtB2KjBMFjXIaA5MFkVU4e4oH0ChriXV8-TJPDcx6r2lstUzhzJ7ilJKjFrQEC3-TAblhR5r-scr1Vfm90aVrQXHew02FwcV_38PVnVqV-mTH20E5bwPwOrPwQkDNP27oqPyTpkwZaUrYIxQ6g0o9lMiw5wPT9DJK8ds6e1aq5QN1GcAAgMnDvtjJntDXFjcsSNoFfWZPdHK3_4xKQj4sqqs_VSzD2CbP2myTOw_JuN7L_qRKlfK2AvoZMrfUIGUH-tSGxIYAwv3fyRYZVNR4pkCYwTUuA7X8_LVFQMQ94aDm_lXpCZeuDBDkFz8JC3ceDPUqhpm6tU4xFDy1XikiQrjZBoFKSU372k1SHFNVPy_B2UU-oMf3d314BkkK_qcjJriUaAVTJkmZ5dV1D0E2X8j_pAFUPD6P8VIyvRjpYsp5UYMBxsuHOR3OWxfYGrAvwppC_C1Ivjk1_4VHxrLg5O69XmRImGdMEiVWt4gFtt9GMG8KX3O2Q7bYN7SfLSlMuhLIC0KOBT4dylTfkFJy6EKUCXqhzb5_uH5Mj8OyreCivJksQ9LvjVMukv2PTTebR_5pSl06t8N4kLm4FCophL_SAE5EDYn6FwLeXNpcuWkFkA0_Zoi5NjH9SEPG9yYp6jVf7MDT7gWc4t13QQJ8Vki96QOdf3SKfBP8vhdv4skyUILBjYzHu9RAEVyam3ckANDGP26FMT_zdEDLTDIlbiHxVeeFWuSPGGWVcwFGcJKD9aHO1j_8ynXUuzIVqixDvhVLhUUAAXpZxVsQHFP15cybhjTiRDRwOz8IBAP6oSlrcBImRRlgwVTnGjrMwrReSX5izt9-9Qe1U_f_V-jpjT-UDwwCgA-_nw4dVducNM" />
            </div>
            <div className={style.infoAboutUser} >

                <div className={style.userName}>
                    {props.userName}
                </div>

                <div className={style.userId}>
                    {props.userId}
                </div>

                <div className={style.userEmail}>
                    {props.userEmail}
                </div>
            </div>

        </div>
    )
}