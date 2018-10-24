# Scrabble
This project assigns english letters tiers based on scrabble points / piece count, and generates Lsystems for users based on their starting word.


## Scrabble Point Values By Letter 
A - 1
B - 3
C - 3
D - 2
E - 1
F - 4
G - 2
H - 4
I - 1
J - 8
K - 5
L - 1
M - 3
N - 1
O - 1
P - 3
Q - 10
R - 1
S - 1
T - 1
U - 1
V - 4
W - 4
X - 8
Y - 4
Z - 10

## Srabble Letters by Point Value
1 - A E I L N O R S T U 
2 - D G
3 - B C M P
4 - F H V W Y
5 - K
8 - J X
10 - Q Z

## Scrabble Letters by Distribution
1 - J K Q X Z
2 - B C F H M P V W Y
3 - G
4 - D L S U 
6 - N R T
8 - O
9 - A I 
12 - E

## Scrabble Letters by Tier 
1 - Q Z (1x, 10pts)
2 - J X (1x, 8pts)
3 - K (1x, 5pts)
4 - F H V W Y (x2, 4pts)
5 - B C M P (x2, 3pts)
6 - G (x3, 2pts)
7 - D (x4, 2pts)
8 - L S U (x4, 1pt)
9 - N R T (x6, 1pt)
10 - O (x8, 1pt)
11 - A I (x9, 1pt)
12 - E (x12, 1pt)

# Super Scrabble

## Super Scrabble Point Values by Letter
A - 1
B - 3
C - 3
D - 2
E - 1
F - 4
G - 2
H - 4
I - 1
J - 8
K - 5
L - 1
M - 3
N - 1
O - 1
P - 3
Q - 10
R - 1
S - 1
T - 1
U - 1
V - 4
W - 4
X - 8
Y - 4
Z - 10

## Super Scrabble Letters By Point Value
1 - A E I L N O R S T U 
2 - D G
3 - B C M P
4 - F H V W Y
5 - K
8 - J X
10 - Q Z

## Super Scrabble Letters by Distribution
2  - J K Q X Z
3  - V
4  - B F P W Y
5  - G H
6  - C M
7  - L U
8  - D
10 - S
13 -  I N R 
15 - O T 
16 - A
24 - E

## Super Scrabble Letters By Tier
1 - Q Z (x2, 10pts)
2 - J X (x2, 8pts)
3 - K (x2, 5pts)
4 - V (x3, 4pts)
5 - F W Y (x4, 4pts)
6 - B P (x4, 3pts)
7 - H (x5, 4pts)
8 - G (x5, 2pts)
9 - C M (x6, 3pts)
10 - L U (x7, 1pt)
11 - D (x8, 2pts)
12 - S (x10, 1pt)
13 - I N R (x13, 1pt)
14 - O T (x15, 1pt)
15 - A (x16, 1pt)
16 - E (x24, 1pt)

# Options for L System Control
A) Movement
    1) Move and Draw
    2) Move without Draw
    3) Movement Length

B) Ruleset
    4) Change Ruleset

C) Rotation
    5)Plus Angle
    6)Minus Angle
    7)Set Angle
D) Scale
    8)Upscale
    9)DownScale    
E) Colour
    10)Change Colour
F) Shape
    11)Arc
    12)Triangle
    13)Line
    14)Rectangle
G) Animation Length
    15)Anim Up
    16)Anim Down


# Ranking Options by Rarity (Least to Most)
1) Move and Draw
2) Plus Angle
3) Minus Angle
4) Move without Draw
5) Movement Length
6) Anim Up
7) Anim Down
8) Upscale
9) Downscale
10) Set Angle
11) Change Colour
12) Line
13) Rectangle
14) Triangle
15) Arc
16) Change Ruleset

# Creating a new Axiom and Ruleset
* Axioms are generated by the user, who starts be filling in a short word (1-10 characters)
* Once the Axiom is generated, prior to any L System growth, the axiom is checked for characters from tiers 10-16 to set the initial parameters for the system
* The LSystem only uses english words to generate new content
* new words are generated via a rule set that pairs each word up with the smallest common scrabble word that contains that letter. if that letter is not contained within the top 100 common scrabble words for that letter count, a word is randomly selected from the list of high scoring scrabble words
* if a letter does not have a word in the top 100 for n letters, a valid word worth as few points as possible is used instead
* No word used will ever have more than a single instance of the letter used to generate it

# Tier 1 Trigger
* When Tier 1, Q Z, is triggered, the ruleset is shifted to a different parameter set. On first through and second trigger, the ruleset is shifted to the most common n+1 letter count word with that letter, following the rules mentioned above. On the third trigger, the ruleset is shifted to one that only uses the highest scoring scrabble words (that do not use Q or Z).  

# Overusage
* If a letter in tier 12 or up is triggered in a generated of the system, all future iterations of those letters are ignored. 

# Most Common Scrabble Word per Letter 
## Minimum three letter word

A - ANE
B - BEE (Generated via point cost)
C - ICE (Generated via point cost)
D - DIE 
E - EAR
F - FIE
G - AGE
H - THY (Generated via point cost)
I - SIC (Generated via point cost) 
J - JUD (Generated via point cost)
K - KHI
L - ALE
M - HEM (Generated via point cost)
N - NYE (Generated via point cost)
O - EON
P - APE
Q - QIS (Generated via point cost)
R - ARE
S - SEA
T - ATE
U - RUE
V - VIE
W - AWE
X - SIX (Generated via point cost)
Y - AYE
Z - ZAP


# Most Common Scrabble Word (4 Letter)

A - AINE
B - BARK (Generated via point cost)
C - MOCK (Generated via point cost)
D - AIDE 
E - AEON
F - FUNK (Generated via point cost)
G - GONK (Generated via point cost)
H - HOOK (Generated via point cost)
I - EDIT 
J - JUDO (Generated via point cost)
K - BACK (Generated via point cost)
L - ALOE
M - POMP (Generated via point cost)
N - SEAN 
O - IOTA
P - CHOP (Generated via point cost)
Q - QUIT (Generated via point cost)
R - DARE 
S - SITE
T - EDIT
U - BUFF (Generated via point cost)
V - DIVE (Generated via point cost)
W - WEAK (Generated via point cost)
X - AXLE (Generated via point cost)
Y - HYPO (Generated via point cost)
Z - ZEST (Generated via point cost)

# Most Common Scrabble Word (5 Letter)

A - RAINE
B - BAJAN (Generated via point cost)
C - PSYCH (Generated via point cost)
D - AILED 
E - ALONE
F - HEFTY (Generated via point cost)
G - GENOA
H - HUNKY (Generated via point cost)
I - RAISE 
J - JOWLS (Generated via point cost)
K - CHECK (Generated via point cost)
L - ALIEN
M - HUMPH (Generated via point cost)
N - ATONE 
O - OILER
P - EXPEL (Generated via point cost)
Q - QUEEN (Generated via point cost)
R - ADORE 
S - SAINE
T - RATIO
U - ADIEU
V - WAVED (Generated via point cost)
W - WHIFT (Generated via point cost)
X - VARIX (Generated via point cost)
Y - MIFFY (Generated via point cost)
Z - HAZER (Generated via point cost)


# Highest Scoring Scrabble Word that does not contain Q or Z (No Duplicates, 8 letter maximum)
A - WHIPJACK
B - JAMBEAUX
C - SKYJACKS
D - JACKDAWS 
E - JEJUNITY
F - JACKFISH
G - HIGHJACK
H - HIJACKED
I - SKIPJACK
J - CRACKJAW
K - KICKBACK
L - FLAPJACK
M - JIMCRACK
N - BANJAXED
O - WAXWORKS
P - HEXAPODY
Q - --------
R - HIJACKER
S - JUMBUCKS
T - MATCHBOX
U - HUMMOCKY
V - CONVEXLY
W - KAJAWAHS
X - EXOPHAGY
Y - KEFFIYEH
Z - --------






