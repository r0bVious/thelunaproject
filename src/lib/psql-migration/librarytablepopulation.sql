INSERT INTO question (question_text) VALUES ('What color looks good today?'), ('How are you feeling today?'), ('What''s the weather like?');

INSERT INTO answer (question_id, answer_text) values (1, 'red'), (1, 'orange'), (1, 'yellow'), (1, 'green'), (1, 'sky blue'), (1, 'blue'), (1, 'purple'), (1, 'pink'), (1, 'cyan'), (1, 'brown'), (1, 'black'), (1, 'white'),  (1, 'gray');

INSERT INTO answer (question_id, answer_text) values (2, 'happy'), (2, 'sad'), (2, 'angry'), (2, 'excited'), (2, 'scared'), (2, 'silly'), (2, 'bored'), (2, 'nervous'), (2, 'tired');

INSERT INTO answer (question_id, answer_text) values (3, 'sunny'), (3, 'cloudy'), (3, 'rainy'), (3, 'snowy'), (3, 'foggy'), (3, 'windy'), (3, 'hot'), (3, 'cold');

INSERT INTO phys_sym (symptom_name) VALUES 
('Fever'),
('Coughing'),
('Runny nose'),
('Stuffy nose'),
('Vomiting'),
('Diarrhea'),
('Rash'),
('Sore throat'),
('Headache'),
('Stomachache'),
('Constipation'),
('Dry skin'),
('Sneezing');