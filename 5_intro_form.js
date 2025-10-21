<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width= , initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>HTML PRACTICE FORM</h1>

    <form action="">
        
        <!-- this is for mobile number details -->
        <label for="mobile_number">Mobile Number</label>
        <input type="text" size="2" value="+91" readonly>
        <input type="tel" id="mobile_number" placeholder="Enter your mobile number" required><br/><br/>
        <!-- required tag is used to make the field mandatory for the user to fill -->

        <!-- this is for date of birth -->
        <label for="dob">Date of Birth</label>
        <input type="date" id="dob" min="2000-05-11"><br/><br/>
        <!-- the format is year-month-date -->

        <!-- this id for date of submission -->
        <label for="date_of_submission">Date of Submission</label>  
        <input type="datetime-local" id="date_of_submission" max="2023-12-31"><br/><br/>

        <!-- dropdown list for selection of programming languages -->
        <label for="programming_language">Programming Language</label>
        <select id="programming_language">
            <!-- option value is used to get the option value in the js from backend -->
            <option value="123">C++</option>
            <option value="JAVA">JAVA</option>
            <option value="PYTHON">PYTHON</option>
            <option value="C">C</option>
            <option value="JAVASCRIPT">JAVASCRIPT</option>
        </select><br/><br/>

        <!-- now this to group the mutliple options in the drop down list with the help of optgroup -->
        <label for="">Select your expertise </label>
        <select name="" id="">

            <!-- This is used just to give a hint to the user  -->
            <option value="" disabled>Select your expertise</option>
            <optgroup label="Frontend Development">
            
            <!-- selected is used like deafult option which is automatically selected when the page loads -->
            <option value="" selected>HTML</option>
            <option value="">CSS</option>
            </optgroup>
            
            <optgroup label="Full stack development">
            <option value="">JAVASCRIPT</option>
            <option value="">REACT</option>
            <option value="">NODE</option>
            </optgroup>
            
            <optgroup label="Backend Development">
            <option value="">MYSQL</option>
            <option value="">MONGODB</option>
            </optgroup>
            
        </select>

        <br/><br/>
        <!-- this is for file upload -->
        <label for="file_upload">Upload your resume</label>
        <input type="file" id="file_upload" accept=".pdf, .docx" required><br/><br/>
        <!-- accept is used to restrict the file type that can be uploaded -->
        <!-- required tag is used to make the field mandatory for the user to fill --> 

        <label for="comment_box">Comment Box:</label>
        <input type="textarea" id="comment_box" placeholder="Enter your comment here" rows="4" cols="50"><br/><br/>

        <input type="submit" value="Submit">


    </form>
    
</body>
</html>
