package com.priya.covid19;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.*;

import java.io.IOException;

public class SendGridEmailer {

    public static void send(String f, String t, String s, String c) throws IOException {

        Email from = new Email("priyasrir2021@srishakthi.ac.in");
        Email to = new Email("kumarsiva0707@gmail.com"); // use your own email address here

        String subject = "Sending with Twilio SendGrid is Fun";
        Content content = new Content("text/html", "and <em>easy</em> to do anywhere with <strong>Java</strong>");

        Mail mail = new Mail(from, subject, to, content);

//        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        SendGrid sg = new SendGrid("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");
        Request request = new Request();

        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());

        Response response = sg.api(request);

        System.out.println(response.getStatusCode());
        System.out.println(response.getHeaders());
        System.out.println(response.getBody());
    }
}
