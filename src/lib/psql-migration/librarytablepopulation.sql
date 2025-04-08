INSERT INTO question (question_text, container_type) VALUES ('What color looks good today?', 'colors'), ('How are you feeling today?', 'feelings'), ('What''s the weather like?', 'weather');

INSERT INTO answer (question_id, answer_text, button_type, button_style) values 
(1, 'red', 'color-swatch', 'red'), 
(1, 'orange', 'color-swatch', 'orange'), 
(1, 'yellow', 'color-swatch', 'yellow'), 
(1, 'green', 'color-swatch', 'green'), 
(1, 'blue', 'color-swatch', 'blue'), 
(1, 'purple', 'color-swatch', 'purple'), 
(1, 'pink', 'color-swatch', 'pink'), 
(1, 'cyan', 'color-swatch', 'cyan'), 
(1, 'white', 'color-swatch', 'white'), 
(1, 'gray', 'color-swatch', 'gray'),
(1, 'black', 'color-swatch', 'black'); 


INSERT INTO answer (question_id, answer_text, button_type, button_style) values (2, 'happy', 'feeling', 'happy'), (2, 'sad', 'feeling', 'sad'), (2, 'angry', 'feeling', 'angry'), (2, 'excited', 'feeling', 'excited'), (2, 'scared', 'feeling', 'scared'), (2, 'silly', 'feeling', 'silly'), (2, 'bored', 'feeling', 'bored'), (2, 'nervous', 'feeling', 'nervous'), (2, 'tired', 'feeling', 'tired');

INSERT INTO answer (question_id, answer_text, button_type, button_style) values (3, 'sunny', 'weather', 'sunny'), (3, 'cloudy', 'weather', 'cloudy'), (3, 'rainy', 'weather', 'rainy'), (3, 'snowy', 'weather', 'snowy'), (3, 'foggy', 'weather', 'foggy'), (3, 'windy', 'weather', 'windy'), (3, 'hot', 'weather', 'hot'), (3, 'cold', 'weather', 'cold');

INSERT INTO phys_sym (symptom_name) VALUES 
('Fever'),
('Coughing'),
('Runny Nose'),
('Stuffy Nose'),
('Vomiting'),
('Diarrhea'),
('Rash'),
('Sore Throat'),
('Headache'),
('Stomachache'),
('Constipation'),
('Dry Skin'),
('Sneezing'),
('Lack of Appetite');