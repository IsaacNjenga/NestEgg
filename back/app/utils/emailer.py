import smtplib
from email.message import EmailMessage
import os

def send_otp_email(to_email,otp):
    EMAIL_ADDRESS  = os.getenv('EMAIL_USER')
    EMAIL_PASSWORD = os.getenv('EMAIL_PASS')

    msg=EmailMessage()
    msg['Subject']='Your OTP Code'
    msg['From']=EMAIL_ADDRESS
    msg['To']=to_email
    msg.set_content(f"Your OTP is: {otp}")

    with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
        smtp.login(EMAIL_ADDRESS,EMAIL_PASSWORD)
        smtp.send_message(msg)